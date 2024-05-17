import { FormControl, InputField, Input } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

export interface GluestackInputFieldProps
  extends ComponentProps<typeof InputField> {}
export interface GluestackFormControlProps
  extends ComponentProps<typeof FormControl> {}

export interface GluestackInpuProps extends ComponentProps<typeof Input> {}
