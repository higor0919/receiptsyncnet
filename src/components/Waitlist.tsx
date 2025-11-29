import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

interface WaitlistProps {
  variant?: "hero" | "cta";
}

const Waitlist = ({ variant = "hero" }: WaitlistProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ email }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already registered",
            description: "This email is already on the waitlist!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: "Welcome to the waitlist!",
          description: "We'll notify you when we launch.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 ${variant === "cta" ? "justify-center text-white" : ""}`}>
        <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-6 py-3">
          <Check className="w-5 h-5 text-green-500" />
          <span className={variant === "cta" ? "text-white" : "text-foreground"}>
            You're on the list!
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={
            variant === "cta"
              ? "h-14 px-6 text-lg bg-white text-foreground"
              : "h-12 px-4"
          }
        />
        <Button
          type="submit"
          disabled={isLoading}
          size={variant === "cta" ? "lg" : "default"}
          className={
            variant === "cta"
              ? "h-14 px-8 text-lg bg-white text-primary hover:bg-white/90"
              : ""
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Joining...
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Waitlist;