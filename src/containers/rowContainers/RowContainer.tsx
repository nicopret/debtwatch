import Row, { type RowProps } from "@/components/ui/rowComponent/Row";
import { ROW_VARIANTS, type RowVariant } from "@/lib/rowVariants";
import type { ReactNode } from "react";

interface RowContainerProps extends Omit<RowProps, "children"> {
  children: ReactNode;
  variant?: RowVariant;
}

export default function RowContainer({
  children,
  variant = "default",
  columns,
  gap,
  align,
  justify,
  wrap,
  className,
}: RowContainerProps) {
  const variantDefaults = ROW_VARIANTS[variant];

  return (
    <Row
      columns={columns ?? variantDefaults.columns}
      gap={gap ?? variantDefaults.gap}
      align={align ?? variantDefaults.align}
      justify={justify ?? variantDefaults.justify}
      wrap={wrap ?? variantDefaults.wrap}
      className={className}
    >
      {children}
    </Row>
  );
}
