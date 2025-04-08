interface SkeletonProps {
  width: number | "full";
  height: number | "full";
  shape: "circle" | "square";
}

export function Skeleton({ width, height, shape }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-500 animate-pulse 
        ${width=== "full" ? 'w-full':`w-[${width.toString()}px]`} 
        ${height=== "full" ? 'h-full':`h-[${height.toString()}px]`} 
        ${shape === "circle" ? "rounded-full" : "rounded-md"}`}
    />
  );
}
