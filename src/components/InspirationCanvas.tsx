import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Search, ZoomIn, ZoomOut, Maximize2, Trash2, 
  Copy, Save, X, Lock, Unlock, ExternalLink, RefreshCw, 
  Eye, CornerDownRight, Focus, Download
} from "lucide-react";

interface CanvasObject {
  id: string;
  type: "image" | "figma";
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string; // Data URL or external URL
  caption: string;
  description?: string;
  figmaUrl?: string;
  createdAt: number;
  isLocked?: boolean;
}

interface InspirationCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspirationCanvas: React.FC<InspirationCanvasProps> = ({ isOpen, onClose }) => {
  // Canvas Transform states (Pan & Zoom)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(typeof window !== 'undefined' && window.innerWidth < 640 ? 0.1 : 1.0);
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  
  // Objects & interaction states
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedObjectId, setDraggedObjectId] = useState<string | null>(null);
  const [resizingObjectId, setResizingObjectId] = useState<string | null>(null);
  const [localClipboard, setLocalClipboard] = useState<CanvasObject | null>(null);
  
  // Overlay modals
  const [pendingObject, setPendingObject] = useState<{
    type: "image" | "figma";
    image?: string;
    figmaUrl?: string;
    width: number;
    height: number;
  } | null>(null);
  const [pendingCaption, setPendingCaption] = useState("");
  const [figmaUrlInput, setFigmaUrlInput] = useState("");
  const [showFigmaInput, setShowFigmaInput] = useState(false);
  const [isDragOverOverlay, setIsDragOverOverlay] = useState(false);
  const [customMenu, setCustomMenu] = useState<{
    x: number;
    y: number;
    objectId: string;
  } | null>(null);

  // Hidden references for tracking drag math and file clicks
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const elementDragStartRef = useRef({ clientX: 0, clientY: 0, objectX: 0, objectY: 0 });
  const resizeStartRef = useRef({ clientX: 0, clientY: 0, startWidth: 0, startHeight: 0 });
  const zoomFactorRef = useRef(1.0);
  const touchStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1.0);

  // Synchronize zoom state to ref for keyboard/wheel handlers
  useEffect(() => {
    zoomFactorRef.current = zoom;
  }, [zoom]);

  // Load objects on initial mount
  useEffect(() => {
    const saved = localStorage.getItem("aman_inspiration_canvas_v2");
    if (saved) {
      try {
        setObjects(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading canvas objects", e);
      }
    } else {
      // Seed default interactive inspiration card
      setObjects([
        {
          id: "seed-design-card",
          type: "image",
          x: -160,
          y: -140,
          width: 320,
          height: 220,
          image: "/image/myimg.webp",
          caption: "💡 Inspiration Hub — Paste or drop anything anywhere on this infinite workspace!",
          createdAt: Date.now()
        }
      ]);
    }
  }, []);

  // Safe manual / Auto-save trigger
  const saveObjects = (updatedList: CanvasObject[]) => {
    localStorage.setItem("aman_inspiration_canvas_v2", JSON.stringify(updatedList));
  };

  useEffect(() => {
    if (objects.length > 0) {
      saveObjects(objects);
    }
  }, [objects]);

  // Track spacebar pan trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Avoid blocking space in inputs
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsSpacePressed(true);
      }

      // Remove selected object via Backspace or Delete
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        // Only if not focused on input
        setObjects(prev => {
          const next = prev.filter(obj => obj.id !== selectedId);
          saveObjects(next);
          return next;
        });
        setSelectedId(null);
      }

      // Copy: Ctrl / Cmd + C
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c" && selectedId) {
        const item = objects.find(o => o.id === selectedId);
        if (item) {
          setLocalClipboard(item);
        }
      }

      // Paste: Ctrl / Cmd + V in workspace
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
        if (localClipboard) {
          // Paste duplicate shifted by 40px
          const duplicated: CanvasObject = {
            ...localClipboard,
            id: `paste-dup-${Date.now()}`,
            x: localClipboard.x + 30,
            y: localClipboard.y + 30,
            createdAt: Date.now()
          };
          setObjects(prev => {
            const next = [...prev, duplicated];
            saveObjects(next);
            return next;
          });
          setSelectedId(duplicated.id);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, selectedId, objects, localClipboard]);

  // Capture Paste event for clipboard real-time images / Figma URLs
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (!isOpen) return;
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return; // Let user type/paste into regular inputs freely
      }

      // Check text for Figma URL
      const pastedText = e.clipboardData?.getData("text");
      if (pastedText && pastedText.includes("figma.com/")) {
        setPendingObject({
          type: "figma",
          figmaUrl: pastedText,
          width: 450,
          height: 320
        });
        setPendingCaption("Embedded Figma Design Frame");
        setPendingCaption("");
        return;
      }

      // Check files for image
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  setPendingObject({
                    type: "image",
                    image: event.target.result as string,
                    width: 320,
                    height: 240
                  });
                  setPendingCaption("");
                }
              };
              reader.readAsDataURL(blob);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => {
      window.removeEventListener("paste", handleGlobalPaste);
    };
  }, [isOpen]);

  // Wheel zoom around the mouse pointer (natural Figma style)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Only zoom on wheel when Ctrl or Option is held, otherwise pan in all directions
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = 1.05;
      const nextZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
      const boundedZoom = Math.min(Math.max(nextZoom, 0.1), 4.0);
      setZoom(Number(boundedZoom.toFixed(2)));
    } else {
      // Normal mousewheel scroll acts as standard Figma panning
      setPan(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }));
    }
  };

  // Drag pan gesture handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Check right click
    if (e.button === 2) {
      return; 
    }

    // Dismiss custom context menus
    if (customMenu) {
      setCustomMenu(null);
    }

    // Allow click interaction inside components if we are not in deep Space panning
    if (isSpacePressed || e.button === 1) {
      setIsPanning(true);
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: pan.x,
        panY: pan.y
      };
      e.preventDefault();
    } else {
      // Click on backdrop clears active selection
      if (e.target === canvasRef.current || e.target instanceof SVGElement) {
        setSelectedId(null);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Handle Canvas Panning
    if (isPanning) {
      const deltaX = e.clientX - panStartRef.current.x;
      const deltaY = e.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + deltaX,
        y: panStartRef.current.panY + deltaY
      });
      return;
    }

    // Handle Active Object Mouse Dragging
    if (draggedObjectId) {
      const activeObj = objects.find(o => o.id === draggedObjectId);
      if (activeObj && !activeObj.isLocked) {
        const deltaX = (e.clientX - elementDragStartRef.current.clientX) / zoom;
        const deltaY = (e.clientY - elementDragStartRef.current.clientY) / zoom;
        setObjects(prev =>
          prev.map(o =>
            o.id === draggedObjectId
              ? {
                  ...o,
                  x: Math.round(elementDragStartRef.current.objectX + deltaX),
                  y: Math.round(elementDragStartRef.current.objectY + deltaY)
                }
              : o
          )
        );
      }
      return;
    }

    // Handle Active Object Resizing
    if (resizingObjectId) {
      const activeObj = objects.find(o => o.id === resizingObjectId);
      if (activeObj && !activeObj.isLocked) {
        const deltaX = (e.clientX - resizeStartRef.current.clientX) / zoom;
        const deltaY = (e.clientY - resizeStartRef.current.clientY) / zoom;
        setObjects(prev =>
          prev.map(o =>
            o.id === resizingObjectId
              ? {
                  ...o,
                  width: Math.max(Math.round(resizeStartRef.current.startWidth + deltaX), 120),
                  height: Math.max(Math.round(resizeStartRef.current.startHeight + deltaY), 100)
                }
              : o
          )
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedObjectId(null);
    setResizingObjectId(null);
  };

  // Touch Panning & Pinch to Zoom Gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (customMenu) {
      setCustomMenu(null);
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const target = touch.target as HTMLElement;
      
      if (
        target.tagName === "INPUT" || 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest(".resize-handle") || 
        target.closest("iframe")
      ) {
        return;
      }

      const cardEl = target.closest(".group\\/card");
      if (!cardEl) {
        setIsPanning(true);
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          panX: pan.x,
          panY: pan.y
        };
      }
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      setDraggedObjectId(null);
      setResizingObjectId(null);

      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      setPan({
        x: touchStartRef.current.panX + deltaX,
        y: touchStartRef.current.panY + deltaY
      });
      if (e.cancelable) e.preventDefault();
    } else if (e.touches.length === 1 && draggedObjectId) {
      const touch = e.touches[0];
      const activeObj = objects.find(o => o.id === draggedObjectId);
      if (activeObj && !activeObj.isLocked) {
        const deltaX = (touch.clientX - elementDragStartRef.current.clientX) / zoom;
        const deltaY = (touch.clientY - elementDragStartRef.current.clientY) / zoom;
        setObjects(prev =>
          prev.map(o =>
            o.id === draggedObjectId
              ? {
                  ...o,
                  x: Math.round(elementDragStartRef.current.objectX + deltaX),
                  y: Math.round(elementDragStartRef.current.objectY + deltaY)
                }
              : o
          )
        );
      }
      if (e.cancelable) e.preventDefault();
    } else if (e.touches.length === 1 && resizingObjectId) {
      const touch = e.touches[0];
      const activeObj = objects.find(o => o.id === resizingObjectId);
      if (activeObj && !activeObj.isLocked) {
        const deltaX = (touch.clientX - resizeStartRef.current.clientX) / zoom;
        const deltaY = (touch.clientY - resizeStartRef.current.clientY) / zoom;
        setObjects(prev =>
          prev.map(o =>
            o.id === resizingObjectId
              ? {
                  ...o,
                  width: Math.max(Math.round(resizeStartRef.current.startWidth + deltaX), 120),
                  height: Math.max(Math.round(resizeStartRef.current.startHeight + deltaY), 100)
                }
              : o
          )
        );
      }
      if (e.cancelable) e.preventDefault();
    } else if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      
      const ratio = dist / pinchStartDistRef.current;
      const nextZoom = pinchStartZoomRef.current * ratio;
      const boundedZoom = Math.min(Math.max(nextZoom, 0.1), 4.0);
      setZoom(Number(boundedZoom.toFixed(2)));
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setDraggedObjectId(null);
    setResizingObjectId(null);
    pinchStartDistRef.current = null;
  };

  const startObjectTouchDrag = (e: React.TouchEvent, obj: CanvasObject) => {
    if (obj.isLocked) return;
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" || 
      target.tagName === "BUTTON" || 
      target.tagName === "A" || 
      target.closest(".resize-handle") || 
      target.closest("iframe")
    ) {
      return;
    }
    e.stopPropagation();
    setSelectedId(obj.id);
    setDraggedObjectId(obj.id);
    const touch = e.touches[0];
    elementDragStartRef.current = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      objectX: obj.x,
      objectY: obj.y
    };
  };

  const startResizerTouchDrag = (e: React.TouchEvent, obj: CanvasObject) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    setResizingObjectId(obj.id);
    const touch = e.touches[0];
    resizeStartRef.current = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      startWidth: obj.width,
      startHeight: obj.height
    };
  };

  // Move element drag setup
  const startObjectDrag = (e: React.MouseEvent, obj: CanvasObject) => {
    // Ignore locked elements or resize widgets
    if (obj.isLocked) return;
    
    // Check click target class to ignore clicks inside form elements
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".resize-handle") || target.closest("iframe")) {
      return;
    }

    e.stopPropagation();
    setSelectedId(obj.id);
    setDraggedObjectId(obj.id);
    elementDragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      objectX: obj.x,
      objectY: obj.y
    };
  };

  // Start corner resizer helper
  const startResizerDrag = (e: React.MouseEvent, obj: CanvasObject) => {
    e.stopPropagation();
    e.preventDefault();
    setResizingObjectId(obj.id);
    resizeStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startWidth: obj.width,
      startHeight: obj.height
    };
  };

  // Zoom manipulation toolbar actions
  const adjustZoom = (factor: "in" | "out" | "reset") => {
    if (factor === "in") {
      setZoom(prev => Math.min(prev * 1.2, 4.0));
    } else if (factor === "out") {
      setZoom(prev => Math.max(prev / 1.2, 0.1));
    } else {
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
    }
  };

  // Centers the view perfectly around active nodes
  const fitToView = () => {
    if (objects.length === 0) {
      setPan({ x: 0, y: 0 });
      setZoom(1.0);
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    objects.forEach(o => {
      minX = Math.min(minX, o.x);
      minY = Math.min(minY, o.y);
      maxX = Math.max(maxX, o.x + o.width);
      maxY = Math.max(maxY, o.y + o.height);
    });

    const padding = 100;
    const contentW = (maxX - minX) + padding * 2;
    const contentH = (maxY - minY) + padding * 2;

    const viewportW = canvasRef.current?.clientWidth || 800;
    const viewportH = canvasRef.current?.clientHeight || 600;

    const scaleX = viewportW / contentW;
    const scaleY = viewportH / contentH;
    const nextZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.35), 2.0);

    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;

    setZoom(nextZoom);
    setPan({
      x: viewportW / 2 - centerX * nextZoom,
      y: viewportH / 2 - centerY * nextZoom
    });
  };

  // Drag and drop events on entire canvas
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverOverlay(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPendingObject({
              type: "image",
              image: event.target.result as string,
              width: 320,
              height: 240
            });
            setPendingCaption("");
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Manual image reference upload triger 
  const handleManualImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPendingObject({
            type: "image",
            image: event.target.result as string,
            width: 350,
            height: 250
          });
          setPendingCaption("");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new active Reference card
  const confirmAddObject = () => {
    if (!pendingObject) return;

    // Place object at target or near center
    const spawnX = Math.round((-pan.x + (canvasRef.current?.clientWidth || 800) / 2) / zoom - pendingObject.width / 2);
    const spawnY = Math.round((-pan.y + (canvasRef.current?.clientHeight || 600) / 2) / zoom - pendingObject.height / 2);

    const newObj: CanvasObject = {
      id: `insp-card-${Date.now()}`,
      type: pendingObject.type,
      x: spawnX,
      y: spawnY,
      width: pendingObject.width,
      height: pendingObject.height,
      image: pendingObject.image,
      figmaUrl: pendingObject.figmaUrl,
      caption: pendingCaption.trim() || (pendingObject.type === "figma" ? "Figma Asset Embed" : "Inspiration reference snapshot"),
      createdAt: Date.now()
    };

    const next = [...objects, newObj];
    setObjects(next);
    saveObjects(next);
    setSelectedId(newObj.id);
    
    // Clear state inputs
    setPendingObject(null);
    setPendingCaption("");
  };

  // Triger Figma link input manually
  const submitFigmaUrlInput = () => {
    if (!figmaUrlInput.trim()) return;
    setPendingObject({
      type: "figma",
      figmaUrl: figmaUrlInput.trim(),
      width: 480,
      height: 340
    });
    setPendingCaption("");
    setFigmaUrlInput("");
    setShowFigmaInput(false);
  };

  // Custom Object actions
  const duplicateObject = (id: string) => {
    const orig = objects.find(o => o.id === id);
    if (!orig) return;
    const duplicated: CanvasObject = {
      ...orig,
      id: `clone-${Date.now()}`,
      x: orig.x + 40,
      y: orig.y + 40,
      createdAt: Date.now()
    };
    const next = [...objects, duplicated];
    setObjects(next);
    saveObjects(next);
    setSelectedId(duplicated.id);
    setCustomMenu(null);
  };

  const deleteObject = (id: string) => {
    const next = objects.filter(o => o.id !== id);
    setObjects(next);
    saveObjects(next);
    if (selectedId === id) setSelectedId(null);
    setCustomMenu(null);
  };

  const toggleLockObject = (id: string) => {
    setObjects(prev => 
      prev.map(o => o.id === id ? { ...o, isLocked: !o.isLocked } : o)
    );
    setCustomMenu(null);
  };

  const bringToFront = (id: string) => {
    const itemIdx = objects.findIndex(o => o.id === id);
    if (itemIdx === -1) return;
    const copyList = [...objects];
    const [target] = copyList.splice(itemIdx, 1);
    copyList.push(target); // Append to last position so it appears on top
    setObjects(copyList);
    saveObjects(copyList);
    setCustomMenu(null);
  };

  // Interactive Right Click Trigger 
  const handleObjectContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    setCustomMenu({
      x: e.clientX,
      y: e.clientY,
      objectId: id
    });
  };

  // Helper download / export action
  const exportReferences = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objects, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `aman_inspiration_moodboard_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  // Search filter matched list
  const filteredObjects = objects.filter(o => 
    o.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Dark eye-friendly overlay with glassmorphism blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/65 backdrop-blur-[8px] z-0 cursor-zoom-out"
        />

        {/* Master Canvas Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 } }
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-[92vw] h-[90vh] bg-[#F5F5F5] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col z-10 select-none pointer-events-auto"
          onDragOver={(e) => { e.preventDefault(); setIsDragOverOverlay(true); }}
          onDragLeave={() => setIsDragOverOverlay(false)}
          onDrop={handleFileDrop}
        >

          {/* Top Integrated Interactive Figma Toolbar */}
          <div className="h-16 border-b border-black/5 bg-[#ffffff]/90 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-40 select-none">
            
            {/* Left section: Info & Search */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <h2 className="text-[#1A1A1D] font-sans font-bold tracking-tight text-xs sm:text-sm select-none">
                  Inspiration Canvas
                </h2>
              </div>
              <div className="hidden sm:block h-4 w-px bg-black/10" />
              
              {/* Context Search */}
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-48 bg-gray-100 focus:bg-white text-[12px] text-gray-800 rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent/40 border border-transparent focus:border-accent/30 transition-all font-sans font-normal"
                />
                {searchQuery && (
                  <X size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setSearchQuery("")} />
                )}
              </div>
            </div>

            {/* Middle Group: Quick Manual Insert Trigger Buttons */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 sm:px-4 py-1.5 hover:bg-white text-gray-800 font-sans font-medium text-[11px] rounded-full transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                title="Upload image references directly"
              >
                <Plus size={12} className="text-accent" />
                <span className="hidden sm:inline">Add Image</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setShowFigmaInput(!showFigmaInput)}
                className="px-2.5 sm:px-4 py-1.5 hover:bg-white text-gray-800 font-sans font-medium text-[11px] rounded-full transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                title="Embed Figma design files via Web URL link"
              >
                <span className="text-accent font-semibold">f</span>
                <span className="hidden sm:inline">Figma Frame</span>
              </button>
            </div>

            {/* Right section: Global Actions & Closer */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button 
                onClick={exportReferences}
                className="hidden sm:flex w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-all cursor-pointer"
                title="Export custom JSON backup"
              >
                <Download size={15} />
              </button>

              {objects.length > 0 && (
                <button 
                  onClick={() => {
                    if (confirm("Are you sure you want to clear your inspiration moodboard?")) {
                      setObjects([]);
                      saveObjects([]);
                      setSelectedId(null);
                    }
                  }}
                  className="hidden sm:flex w-8 h-8 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center transition-all cursor-pointer"
                  title="Clear Moodboard"
                >
                  <Trash2 size={15} />
                </button>
              )}

              <div className="hidden sm:block h-4 w-px bg-black/10 mx-1 sm:mx-0" />

              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-800 font-sans flex items-center justify-center transition-all font-semibold cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Figma Frame Web Link Paste Input Bar */}
          <AnimatePresence>
            {showFigmaInput && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white border-b border-black/5 px-6 py-3 flex items-center gap-3 z-30"
              >
                <span className="text-xs text-gray-500 font-mono">Figma File URL:</span>
                <input 
                  type="text"
                  placeholder="https://www.figma.com/file/..."
                  value={figmaUrlInput}
                  onChange={(e) => setFigmaUrlInput(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-accent"
                  onKeyDown={(e) => e.key === 'Enter' && submitFigmaUrlInput()}
                />
                <button 
                  onClick={submitFigmaUrlInput}
                  className="px-4 py-1.5 bg-accent hover:bg-[#B0123C] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  Embed Frame
                </button>
                <button 
                  onClick={() => setShowFigmaInput(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Drag-Pan Infinite stage */}
          <div 
            ref={canvasRef}
            className={`flex-1 relative cursor-grab overflow-hidden outline-none ${
              isSpacePressed ? "cursor-grab" : ""
            } ${isPanning ? "cursor-grabbing" : ""}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              backgroundColor: "#F5F5F5",
              backgroundImage: "radial-gradient(circle, #D5D5D5 1.2px, transparent 1.2px)",
              backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`
            }}
          >

            {/* Virtual canvas node container */}
            <div 
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
                position: "absolute",
                inset: 0,
                pointerEvents: "none"
              }}
            >
              {/* Render references on the board layout */}
              {filteredObjects.map((obj) => {
                const isSelected = selectedId === obj.id;
                
                return (
                  <div
                    key={obj.id}
                    onMouseDown={(e) => startObjectDrag(e, obj)}
                    onTouchStart={(e) => startObjectTouchDrag(e, obj)}
                    onContextMenu={(e) => handleObjectContextMenu(e, obj.id)}
                    style={{
                      position: "absolute",
                      left: obj.x,
                      top: obj.y,
                      width: obj.width,
                      height: obj.height,
                      pointerEvents: "auto"
                    }}
                    className={`group/card rounded-2xl bg-white border shadow-md flex flex-col p-2 select-none select-none transition-shadow ${
                      isSelected 
                        ? "ring-2 ring-accent border-accent shadow-xl z-20" 
                        : "border-black/5 hover:border-black/15 hover:shadow-lg z-10"
                    }`}
                  >
                    
                    {/* Active object Header Toolbar */}
                    <div className="flex items-center justify-between mb-1.5 px-0.5 pointer-events-auto h-auto sm:h-6">
                      <span className="text-[12px] sm:text-[10px] font-mono font-medium text-gray-400 capitalize max-w-[50%] sm:max-w-[70%] truncate">
                        {obj.type === "figma" ? "Figma Embed" : "Reference"}
                      </span>
                      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover/card:opacity-100 transition-opacity">
                        {obj.isLocked ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleLockObject(obj.id); }}
                            className="p-1.5 sm:p-0.5 hover:bg-gray-100 rounded text-amber-500"
                            title="Unlock design card"
                          >
                            <Lock className="w-5 h-5 sm:w-3 sm:h-3" />
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleLockObject(obj.id); }}
                            className="p-1.5 sm:p-0.5 hover:bg-gray-100 rounded text-gray-400"
                            title="Lock design card"
                          >
                            <Unlock className="w-5 h-5 sm:w-3 sm:h-3" />
                          </button>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); duplicateObject(obj.id); }}
                          className="p-1.5 sm:p-0.5 hover:bg-gray-100 rounded text-gray-400"
                          title="Duplicate reference"
                        >
                          <Copy className="w-5 h-5 sm:w-3 sm:h-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteObject(obj.id); }}
                          className="p-1.5 sm:p-0.5 hover:bg-red-50 rounded text-red-500"
                          title="Delete reference"
                        >
                          <Trash2 className="w-5 h-5 sm:w-3 sm:h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Node Visual Content Box */}
                    <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden relative border border-black/5 flex items-center justify-center">
                      
                      {obj.type === "image" && (
                        <img 
                          src={obj.image} 
                          alt={obj.caption}
                          className="w-full h-full object-cover select-none pointer-events-none"
                          draggable={false}
                        />
                      )}

                      {obj.type === "figma" && (
                        <div className="w-full h-full relative group">
                          {/* Render Figma iframe safely */}
                          <iframe 
                            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(obj.figmaUrl || "")}`}
                            className="w-full h-full border-none pointer-events-auto rounded-lg"
                            title="Interactive Figma reference frame"
                            allowFullScreen
                          />
                          <div className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-lg text-white pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <a 
                              href={obj.figmaUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-[9px] font-mono tracking-tight"
                            >
                              Open Figma <ExternalLink size={9} />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Drag resize handle bottom-right corner widget */}
                    {isSelected && !obj.isLocked && (
                      <div 
                        onMouseDown={(e) => startResizerDrag(e, obj)}
                        onTouchStart={(e) => startResizerTouchDrag(e, obj)}
                        className="absolute bottom-1 right-1 w-3 h-3 cursor-se-resize resize-handle z-30"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" className="text-gray-400">
                          <line x1="7" y1="3" x2="3" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="9" y1="5" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}

                    {/* Bottom Caption Input Label Description box */}
                    <div className="pt-2 px-1 pb-1">
                      <input 
                        type="text"
                        value={obj.caption}
                        onChange={(e) => {
                          const val = e.target.value;
                          setObjects(prev => prev.map(item => item.id === obj.id ? { ...item, caption: val } : item));
                        }}
                        className="w-full bg-transparent text-gray-800 text-[16px] sm:text-[11px] font-sans font-medium focus:outline-none focus:bg-gray-100 focus:px-1.5 py-1 sm:py-0.5 rounded tracking-tight truncate border-none focus:ring-0 cursor-text pointer-events-auto"
                        title="Click to edit reference description"
                      />
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Instruction Banner when Canvas list is empty */}
            {objects.length === 0 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none">
                <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center text-[#ff2a54] mb-3 border border-[#ff2a54]/10">
                  <Focus size={24} className="animate-pulse" />
                </div>
                <h3 className="text-[#1A1A1D] font-bold text-sm mb-1.5 font-sans">Board is empty</h3>
                <p className="text-gray-500 font-sans font-normal text-xs max-w-sm leading-relaxed">
                  Press <kbd className="bg-gray-200 border border-black/10 rounded px-1.5 py-0.5 mx-0.5 text-[10px]">Ctrl+V</kbd> to paste designs from your clipboards, drag references directly here, or press the manual buttons inside the Toolbar!
                </p>
              </div>
            )}

            {/* Active Drag-Over dashboard overlay */}
            {isDragOverOverlay && (
              <div className="absolute inset-0 bg-accent/5 backdrop-blur-[2px] border-4 border-dashed border-accent m-4 rounded-[24px] pointer-events-none flex flex-col items-center justify-center z-50">
                <div className="p-4 bg-white rounded-full shadow-lg mb-2">
                  <Plus size={24} className="text-accent animate-bounce" />
                </div>
                <h4 className="text-black font-semibold text-sm">Drop file to import reference</h4>
                <p className="text-gray-500 text-xs mt-1">Accepting high resolution design screenshots instantly</p>
              </div>
            )}

          </div>

          {/* Bottom Control Actions tray */}
          <div className="h-12 border-t border-black/5 bg-white px-3 sm:px-6 flex items-center justify-end sm:justify-between z-40 select-none">
            
            {/* Display shortcut highlights */}
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 font-sans pointer-events-auto">
              <span className="font-medium bg-gray-50 px-2 py-0.5 rounded-full text-gray-500 border border-black/5">
                {filteredObjects.length} reference cards
              </span>
              <span className="text-gray-300 mx-1.5">•</span>
              
              {/* Desktop guide */}
              <div className="hidden sm:flex items-center gap-1">
                <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">Space + Drag</kbd>
                <span className="text-gray-400">to Pan</span>
                <span className="text-gray-300 mx-1.5">|</span>
                <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">Ctrl + Scroll</kbd>
                <span className="text-gray-400">to Zoom</span>
              </div>
            </div>

            {/* Right Zoom percentage cluster */}
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-full p-0.5 pointer-events-auto">
              
              <button 
                onClick={() => adjustZoom("out")}
                className="w-7 h-7 hover:bg-white text-gray-600 hover:text-black rounded-full flex items-center justify-center transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={13} />
              </button>
              
              <button 
                onClick={() => adjustZoom("reset")}
                className="px-2 text-[11px] font-mono tracking-tight font-bold text-gray-700 hover:text-black transition-all cursor-pointer select-none"
                title="Reset zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button 
                onClick={() => adjustZoom("in")}
                className="w-7 h-7 hover:bg-white text-gray-600 hover:text-black rounded-full flex items-center justify-center transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={13} />
              </button>

              <div className="h-4 w-px bg-gray-300/60 my-auto" />

              <button 
                onClick={fitToView}
                className="w-7 h-7 hover:bg-white text-gray-600 hover:text-black rounded-full flex items-center justify-center transition-all cursor-pointer"
                title="Center and Fit View to References"
              >
                <Maximize2 size={12} />
              </button>

            </div>

          </div>

          {/* Dialog: Enter Caption Prompt before insert card */}
          {pendingObject && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[1100] p-4">
              <div className="bg-zinc-950/95 border border-[#DE1C4D]/35 rounded-[28px] p-6 sm:p-7 w-full max-w-[440px] shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_80px_rgba(222,28,77,0.08)] animate-in fade-in zoom-in-95 duration-250 relative overflow-hidden">
                {/* Visual ambient accent orb in bg */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DE1C4D]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DE1C4D]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#DE1C4D]/90">Canvas Asset</span>
                    <h3 className="text-white text-lg font-bold font-sans tracking-tight">Configure Visual Asset</h3>
                  </div>
                  <button 
                    onClick={() => setPendingObject(null)} 
                    className="p-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-all border border-zinc-800"
                    title="Dismiss dialog"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="mb-5 bg-zinc-900/50 rounded-2xl border border-zinc-800/80 p-3.5 flex items-center justify-center max-h-[160px] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
                  {pendingObject.type === 'image' ? (
                    <img 
                      src={pendingObject.image} 
                      className="h-[120px] object-contain rounded-xl shadow-lg border border-zinc-800 transition-transform duration-500 group-hover:scale-105" 
                      alt="Thumbnail reference" 
                    />
                  ) : (
                    <div className="text-center py-5">
                      <span className="text-[9px] font-mono font-bold tracking-wider bg-[#DE1C4D]/15 text-white/90 px-3 py-1 rounded-full border border-[#DE1C4D]/35">
                        Figma Integration Live
                      </span>
                      <p className="text-zinc-300 text-xs mt-2.5 max-w-[320px] truncate font-medium">{pendingObject.figmaUrl}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6 relative z-10 text-left">
                  <label className="block text-zinc-100 text-[14px] font-sans font-medium mb-2 tracking-wide">
                    Asset Label
                  </label>
                  <input 
                    autoFocus
                    type="text" 
                    value={pendingCaption} 
                    onChange={e => setPendingCaption(e.target.value)} 
                    placeholder="e.g. Elegant visual theme reference, Card mock inspiration..."
                    className="w-full bg-zinc-900 text-sm border border-zinc-800 focus:border-[#DE1C4D] focus:ring-4 focus:ring-[#DE1C4D]/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-200"
                    onKeyDown={(e) => e.key === 'Enter' && confirmAddObject()}
                  />
                  <div className="flex gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE1C4D]/80 mt-1 shrink-0" />
                    <p className="text-zinc-400 text-[10px] font-sans leading-relaxed">
                      Set a custom tag label below to instantly categorize this resource contextually inside your workspace board canvas.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900/80 relative z-10">
                  <button 
                    type="button"
                    onClick={() => setPendingObject(null)}
                    className="px-4 py-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white font-sans text-xs font-semibold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={confirmAddObject}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#FF2A54] via-[#DE1C4D] to-[#B60E36] hover:from-[#DE1C4D] hover:to-[#9A0B31] text-white font-sans text-xs font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_16px_rgba(222,28,77,0.3)] select-none cursor-pointer"
                  >
                    Save to Board
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Click Interactive Custom Overlay Context Menu */}
          {customMenu && (
            <div 
              className="fixed bg-[#0A0A0C] border border-[#DE1C4D]/35 rounded-xl shadow-2xl z-[1200] py-1.5 w-44 font-mono text-[10px] text-white"
              style={{ top: customMenu.y, left: customMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => bringToFront(customMenu.objectId)}
                className="w-full text-left px-3.5 py-2 hover:bg-white/5 transition-all text-gray-300 hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Bring to Front</span>
                <span className="text-gray-500">⌥F</span>
              </button>
              
              <button 
                onClick={() => toggleLockObject(customMenu.objectId)}
                className="w-full text-left px-3.5 py-2 hover:bg-white/5 transition-all text-gray-300 hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>
                  {objects.find(o => o.id === customMenu.objectId)?.isLocked ? "Unlock Card" : "Lock Card"}
                </span>
                <span className="text-gray-500">⌥L</span>
              </button>

              <button 
                onClick={() => duplicateObject(customMenu.objectId)}
                className="w-full text-left px-3.5 py-2 hover:bg-white/5 transition-all text-gray-300 hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Duplicate</span>
                <span className="text-gray-500">⌘C</span>
              </button>

              <div className="h-px bg-white/5 my-1" />

              <button 
                onClick={() => deleteObject(customMenu.objectId)}
                className="w-full text-left px-3.5 py-2 hover:bg-red-500/10 hover:text-red-400 transition-all text-red-500 flex items-center justify-between cursor-pointer"
              >
                <span>Delete Reference</span>
                <span className="text-red-400">Del</span>
              </button>
            </div>
          )}

          {/* Hidden file importer input element */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleManualImageUpload}
            accept="image/*"
            className="hidden"
          />

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
