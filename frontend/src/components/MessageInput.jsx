import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2 sm:p-4 w-full">
      {imagePreview && (
        <div className="mb-2 sm:mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-1 sm:gap-2">
        <div className="flex-1 flex gap-1 sm:gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            className="w-full input input-bordered rounded-lg input-sm h-9 sm:h-10"
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex items-center justify-center min-h-[2.25rem] min-w-[2.25rem] sm:min-h-[2.5rem] sm:min-w-[2.5rem] rounded-full ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            } hover:bg-base-300 transition-colors`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} className="sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center min-h-[2.25rem] min-w-[2.25rem] sm:min-h-[2.5rem] sm:min-w-[2.5rem] rounded-full hover:bg-base-300 transition-colors"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={18} className="sm:size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
