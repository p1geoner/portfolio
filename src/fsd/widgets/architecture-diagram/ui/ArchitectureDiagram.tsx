'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import type { TArchitecture } from '@/shared/content';
import { useAppLocale } from '@/shared/i18n';

import { edgeKey, layoutArchitectureGraph } from '../lib/layoutGraph';
import styles from './ArchitectureDiagram.module.scss';

type IArchitectureDiagramProps = {
  architecture: TArchitecture;
  className?: string;
  /** Компактный превью без summary/items и без hover-интерактива. */
  compact?: boolean;
};

type TPoint = { x: number; y: number };

const EASE = [0.22, 1, 0.36, 1] as const;

const buildPath = (from: TPoint, to: TPoint): string => {
  const dx = Math.max(24, Math.abs(to.x - from.x) * 0.45);
  const c1x = from.x + dx;
  const c2x = to.x - dx;
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
};

/**
 * Graph-схема фронтенда кейса: узлы = layers, связи = edges.
 * Full — на странице кейса; compact — превью в showcase.
 */
export const ArchitectureDiagram = ({
  architecture,
  className,
  compact = false,
}: IArchitectureDiagramProps) => {
  const locale = useAppLocale();
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLLIElement>());
  const [centers, setCenters] = useState<ReadonlyMap<string, TPoint>>(
    () => new Map()
  );
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const layout = useMemo(
    () => layoutArchitectureGraph(architecture),
    [architecture]
  );

  const layerById = useMemo(
    () => new Map(architecture.layers.map((layer) => [layer.id, layer])),
    [architecture.layers]
  );

  const maxRows = Math.max(1, ...layout.rowsByColumn);
  const relatedIds = useMemo(() => {
    if (activeNodeId === null) return null;
    const related = new Set<string>([activeNodeId]);
    for (const edge of architecture.edges) {
      if (edge.from === activeNodeId || edge.to === activeNodeId) {
        related.add(edge.from);
        related.add(edge.to);
      }
    }
    return related;
  }, [activeNodeId, architecture.edges]);

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const canvasRect = canvas.getBoundingClientRect();
    const next = new Map<string, TPoint>();

    for (const [id, element] of nodeRefs.current) {
      const rect = element.getBoundingClientRect();
      next.set(id, {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top + rect.height / 2,
      });
    }

    setCenters(next);
  }, []);

  useLayoutEffect(() => {
    measure();

    const canvas = canvasRef.current;
    if (canvas === null) return;

    const observer = new ResizeObserver(() => {
      measure();
    });
    observer.observe(canvas);

    for (const element of nodeRefs.current.values()) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [measure, layout, locale, compact]);

  const setNodeRef = useCallback(
    (id: string, element: HTMLLIElement | null) => {
      if (element === null) {
        nodeRefs.current.delete(id);
        return;
      }
      nodeRefs.current.set(id, element);
    },
    []
  );

  const handleNodeEnter = (id: string) => {
    if (compact) return;
    setActiveNodeId(id);
  };

  const handleNodeLeave = () => {
    if (compact) return;
    setActiveNodeId(null);
  };

  const handlePointerLeaveGraph = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (compact) return;
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveNodeId(null);
    }
  };

  return (
    <div
      className={clsx(styles.root, compact && styles.rootCompact, className)}
    >
      {compact ? null : (
        <div className={styles.meta}>
          <p className={styles.pattern}>{architecture.pattern[locale]}</p>
          <p className={styles.summary}>{architecture.summary[locale]}</p>
        </div>
      )}

      <div className={styles.graph} onPointerLeave={handlePointerLeaveGraph}>
        <div
          ref={canvasRef}
          className={styles.canvas}
          style={{
            // Запас под высоту строк, чтобы рёбра не сжимались.
            minHeight: compact
              ? `${Math.max(4.5, maxRows * 3.2)}rem`
              : undefined,
          }}
        >
          <svg className={styles.edges} aria-hidden='true'>
            {architecture.edges.map((edge) => {
              const from = centers.get(edge.from);
              const to = centers.get(edge.to);
              if (from === undefined || to === undefined) return null;

              const isActive =
                relatedIds !== null &&
                relatedIds.has(edge.from) &&
                relatedIds.has(edge.to) &&
                (edge.from === activeNodeId || edge.to === activeNodeId);
              const isDim = relatedIds !== null && !isActive;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 8;

              return (
                <g key={edgeKey(edge)}>
                  <path
                    d={buildPath(from, to)}
                    className={clsx(
                      styles.edge,
                      !prefersReducedMotion && !compact && styles.edgeFlow,
                      isActive && styles.edgeActive,
                      isDim && styles.edgeDim
                    )}
                  />
                  {edge.label !== undefined && !compact ? (
                    <text
                      x={midX}
                      y={midY}
                      textAnchor='middle'
                      className={clsx(
                        styles.edgeLabel,
                        isActive && styles.edgeLabelActive,
                        isDim && styles.edgeDim
                      )}
                    >
                      {edge.label[locale]}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          <ol
            className={styles.nodes}
            style={{
              gridTemplateColumns: `repeat(${layout.columns}, minmax(7.5rem, 1fr))`,
              gridTemplateRows: `repeat(${maxRows}, auto)`,
            }}
          >
            {layout.nodes.map((nodeLayout, index) => {
              const layer = layerById.get(nodeLayout.id);
              if (layer === undefined) return null;

              const isActive = activeNodeId === layer.id;
              const isDim = relatedIds !== null && !relatedIds.has(layer.id);

              return (
                <motion.li
                  key={layer.id}
                  ref={(element) => setNodeRef(layer.id, element)}
                  className={clsx(
                    styles.node,
                    isActive && styles.nodeActive,
                    isDim && styles.nodeDim
                  )}
                  style={{
                    gridColumn: nodeLayout.column + 1,
                    gridRow: nodeLayout.row + 1,
                  }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 20, filter: 'blur(5px)' }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  viewport={{ once: true, margin: '-6% 0px' }}
                  transition={{
                    duration: compact ? 0.45 : 0.65,
                    delay: index * (compact ? 0.04 : 0.07),
                    ease: EASE,
                  }}
                  onPointerEnter={() => handleNodeEnter(layer.id)}
                  onPointerLeave={handleNodeLeave}
                  onFocus={() => handleNodeEnter(layer.id)}
                  onBlur={handleNodeLeave}
                  tabIndex={compact ? -1 : 0}
                >
                  <span className={styles.nodeIndex} aria-hidden='true'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.nodeLabel}>{layer.label[locale]}</h3>
                  {compact ? null : (
                    <ul className={styles.items}>
                      {layer.items[locale].map((item) => (
                        <li key={item} className={styles.item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
