import { cn } from "@/lib/utils";

interface props {
  isButton?: boolean;
}

const Loader = ({ isButton }: props) => {
  return (
    <div
      className={`flex justify-center items-center ${!isButton && "h-screen"}`}
    >
      <div
        className={cn(
          isButton
            ? "h-[16px] w-[16px] border-[2px] border-accentColor/40 border-t-white border-t-[2px]"
            : "h-[40px] w-[40px] border-[4px] border-slate-300 border-t-accentColor border-t-[4px]",
          "border-solid  dark:border-slate-700 dark:border-t-accentColor rounded-full animate-spin"
        )}
      ></div>
    </div>
  );
};

export default Loader;
