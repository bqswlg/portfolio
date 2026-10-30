interface IconProps {
  /** Material Symbols 名稱，例如 "download" */
  name: string
  /** 額外的樣式 class（字級、顏色等） */
  className?: string
}

/** Material Symbols Outlined 圖示包裝 */
export default function Icon({ name, className }: IconProps) {
  return (
    <span className={className ? `material-symbols-outlined ${className}` : 'material-symbols-outlined'} aria-hidden="true">
      {name}
    </span>
  )
}
