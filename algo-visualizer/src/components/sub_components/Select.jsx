// install radix-ui/react-select
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from 'c:/Users/ACER-PC/Downloads/Algorithm Visualizer UI Design/src/app/components/ui/utils'
import {CheckIcon, ChevronUpIcon, ChevronDownIcon} from "lucide-react"

function Select({...prop}) {
    return <SelectPrimitive.Root data-slot="select" {...prop}></SelectPrimitive.Root>
}

// group component tgt
function SelectGroup({...prop}) {
    return <SelectPrimitive.Group data-slot = "select-group" {...prop}></SelectPrimitive.Group>
}

// each value in the group
function SelectValue({...prop}) {
    return <SelectPrimitive.Value data-slot="select-value" {...prop}></SelectPrimitive.Value>
}
function SelectContent({
    className,
    children,
    position= 'popper',
    ...prop
}) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
            data-slot="select-content"
            className={cn(cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        ))}
            position=''
            {...prop}
            >
                {children}
                <SelectPrimitive.Viewport>
                    <SelectPrimitive.SelectScrollDownButton></SelectPrimitive.SelectScrollDownButton>
                </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
}

function SelectLabel({className,...prop}) {
    return (
        <SelectPrimitive.Label
        data-slot='select-label'
        className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
        {...prop}
        >

        </SelectPrimitive.Label>
    )
}


function SelectItem({className, children,...prop}) {
    return (
        <SelectPrimitive.Item
        data-slot='select-item'
        className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...prop}
      
      >
        <SelectPrimitive.ItemIndicator>
            <CheckIcon></CheckIcon>
        </SelectPrimitive.ItemIndicator>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
}

function SelectSeparator({className,...prop}) {
    return (
        <SelectPrimitive.Separator
        data-slot='select-separator'
        className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
        {...prop}></SelectPrimitive.Separator>
    )
}

function SelectScrollUpButton({className,...prop}) {
    return (
        <SelectPrimitive.ScrollUpButton
        data-slot='select-scroll-up-button'
        className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...prop}>
         <ChevronUpIcon className="size-4" />
      </SelectPrimitive.ScrollUpButton>
    )
}
function SelectScrollDownButton({className,...prop}) {
    return (
        <SelectPrimitive.ScrollDownButton
        data-slot='select-scroll-down-button'
        className={cn(
        "flex cursor-default items-center justify-center py-1",
        className,
      )}
      {...prop}>
         <ChevronDownIcon className="size-4" />
      </SelectPrimitive.ScrollDownButton>
    )
}
export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectValue,
    SelectSeparator
}