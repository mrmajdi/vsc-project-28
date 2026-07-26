'use client';

import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ImageItem = {
  id: string;
  src: string;
  alt: string;
};

const initialImages: ImageItem[] = [
  { id: '1', src: '/images/gallery/1.jpg', alt: 'Gallery Image 1' },
  { id: '2', src: '/images/gallery/2.jpg', alt: 'Gallery Image 2' },
  { id: '3', src: '/images/gallery/3.jpg', alt: 'Gallery Image 3' },
  { id: '4', src: '/images/gallery/4.jpg', alt: 'Gallery Image 4' },
  { id: '5', src: '/images/gallery/5.jpg', alt: 'Gallery Image 5' },
  { id: '6', src: '/images/gallery/6.jpg', alt: 'Gallery Image 6' },
];

export default function GalleryPage() {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const sensors = useSensors(PointerSensor, KeyboardSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const SortableItem = ({ id }: { id: string }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });
    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      userSelect: 'none',
      pointerEvents: isDragging ? 'none' : 'auto',
    };

    const image = images.find((img) => img.id === id);
    if (!image) return null;

    return (
      <div ref={setNodeRef} style={{ ...style, ...attributes }} {...listeners}>
        <div
          className="relative overflow-hidden rounded-lg shadow-lg border border-gray-200 bg-white transition-transform duration-200"
          style={{ transform: isDragging ? 'scale(1.05)' : 'none' }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-cover"
            draggable={false}
          />
          {/* Optional drag handle UI */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity duration-200 pointer-events-none">
            {isDragging && (
              <span className="text-white text-sm font-medium">
                Drag to reorder
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Image Gallery</h2>
        <p className="text-center text-gray-600 mb-8">
          Drag and drop images to reorder them.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter>
          dragAnimation={{
            duration: 200,
          }}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((item) => (
                <SortableItem key={item.id} id={item.id} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}