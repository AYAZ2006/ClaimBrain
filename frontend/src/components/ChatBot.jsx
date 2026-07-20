import { useEffect } from "react";

export default function BotpressChat() {
  useEffect(() => {
    const inject = document.createElement("script");
    inject.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    inject.async = true;
    inject.onload = () => {
      const bot = document.createElement("script");
      bot.src ="https://files.bpcontent.cloud/2026/07/19/06/20260719063408-4H1F0RGZ.js";
      bot.async = true;
      document.body.appendChild(bot);
    };
    document.body.appendChild(inject);
    return () => {
      if (window.botpress?.close) {
        window.botpress.close();
      }
      const scripts = document.querySelectorAll('script[src*="botpress"], script[src*="bpcontent.cloud"]');
      scripts.forEach((script) => script.remove());
      const iframe = document.querySelector('iframe[src*="botpress"], iframe[src*="bpcontent.cloud"]');
      if (iframe) iframe.remove();
    };
  }, []);
  return null;
}