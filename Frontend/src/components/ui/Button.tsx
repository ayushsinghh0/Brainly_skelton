export interface Buttonprops {
    variant : "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick: () => void;
}

const variantStyle={
     "primary":"bg-purple-500 text-white",
     "secondary":"bg-purple-300 text-purple-500"
}

const sizeStyles = {
    "sm":"py-1 px-2",
    "md": "py-2 px-4 ",
    "lg": "py-4 px-6"
}

const defaultStyles="rounded-md flex items-center gap-2 justify-center"

export const Button=(props: Buttonprops)=>{
    return <button 
    className={`${variantStyle[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`
    }>
        {props.startIcon ? <div className="">{props.startIcon}</div> :null}
     
     {" "}{props.text}
    </button>
}
<Button variant="primary" text='j' size="sm"/>