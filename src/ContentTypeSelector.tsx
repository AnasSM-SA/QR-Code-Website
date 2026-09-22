import {
  CONTENT_TYPES,
  type ContentType,
} from "./content";

type ContentTypeSelectorProps = {
  selectedType: ContentType;
  labels: Record<ContentType, string>;
  groupLabel: string;
  onChange: (type: ContentType) => void;
};

export function ContentTypeSelector({
  selectedType,
  labels,
  groupLabel,
  onChange,
}: ContentTypeSelectorProps) {
  return (
    <div className="type-selector">
      <span className="type-selector-label" id="content-type-label">
        {groupLabel}
      </span>
      <div
        className="type-selector-grid"
        role="group"
        aria-labelledby="content-type-label"
      >
        {CONTENT_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={selectedType === type ? "is-active" : ""}
            aria-pressed={selectedType === type}
            onClick={() => onChange(type)}
          >
            {labels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
