import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2 } from "lucide-react";

interface WaitlistProps {
  variant?: "hero" | "cta" | "secondary";
}

const Waitlist = ({ variant = "hero" }: WaitlistProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t('waitlist.invalidEmail'),
        description: t('waitlist.invalidEmailDescription'),
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
            title: t('waitlist.alreadyRegistered'),
            description: t('waitlist.alreadyRegisteredDescription'),
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: t('waitlist.success'),
          description: t('waitlist.successDescription'),
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        title: t('waitlist.error'),
        description: t('waitlist.errorDescription'),
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
            {t('waitlist.success')}
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
          placeholder={t('waitlist.placeholder')}
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
          variant={variant === "secondary" ? "secondary" : "default"}
          className={
            variant === "cta"
              ? "h-14 px-8 text-lg bg-white text-primary hover:bg-white/90"
              : ""
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {t('waitlist.joining')}
            </>
          ) : (
            t('waitlist.button')
          )}
        </Button>
      </div>
    </form>
  );
};

export default Waitlist;
