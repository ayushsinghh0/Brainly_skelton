export interface Buttonprops {
    variant : "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick?: () => void;
    FullWidth?: boolean;
    Loading?: boolean
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
    return <button onClick={props.onClick} 
    className={variantStyle[props.variant] +" "+ defaultStyles + " "+ sizeStyles[props.size] + " "+ 
        `${props.FullWidth ? " w-full flex justify-center items-center ": ""} ${props.Loading ? "opacity-45" :""}`
    } disabled={props.Loading}>
        {props.startIcon ? <div className="">{props.startIcon}</div> :null}
     
     {" "}{props.text}
    </button>
}