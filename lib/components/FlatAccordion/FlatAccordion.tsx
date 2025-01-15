import { Accordion, AccordionProps } from "@mui/material";
import React from "react";

/** An accordion with flat borders */
export const FlatAccordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    return (
      <Accordion
        ref={ref}
        disableGutters
        elevation={0}
        sx={{
          "&:before": { display: "none" },
          ...props.sx,
        }}
        {...props}
      >
        {props.children}
      </Accordion>
    );
  }
);

FlatAccordion.displayName = "FlatAccordion";
