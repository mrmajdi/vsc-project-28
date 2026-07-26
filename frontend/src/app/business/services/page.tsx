import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TagInputProps {
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  initialTags = [],
  onChange,
  placeholder = 'Add a service...',
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      onChange?.([...tags, trimmed]);
    }
  };

  const handleRemove = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAdd(inputValue);
        setInputValue('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="tag-input w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-primary-600 hover:text-primary-800"
              onClick={() => handleRemove(tag)}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
};

/**
 * Page component for managing provider services.
 * Uses the TagInput component to allow adding/removing service tags.
 */
export default function Page() {
  const [services, setServices] = useState<string[]>([]);

  return (
    <section className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Manage Provider Services</h1>
      <TagInput
        initialTags={services}
        onChange={setServices}
        placeholder="Enter a service (press Enter or comma)"
      />
      <p className="mt-4 text-sm text-gray-500">
        Current services: {services.length > 0 ? services.join(', ') : 'None'}
      </p>
    </section>
  );
}