import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md"

const CommentInput = ({ reply, comment, setComment, handleAddReply, handleAddComment, loading, setEmoji, emoji, theme }) => {

    const inputRef = useRef(null);
  return (
      <div className= " w-full h-fit flex items-center justify-center p-3 gap-3">
          <MdOutlineEmojiEmotions size={27} className="text-white cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out" onClick={() => { setEmoji(!emoji) }} />
          <input ref={inputRef} type="text" value={comment} onChange={(e) => { setComment(e.target.value) }}  placeholder="Add a comment..." className="w-full h-10 outline-none bg-transparent text-white" />
          <button onClick={reply ? handleAddReply : handleAddComment} disabled={comment === ''} className={`text-white transition-all duration-200 ease-in-out ${comment === '' ? 'opacity-50' : 'active:scale-95 hover:text-[#ffffff81] cursor-pointer '}`}>{loading ? (
              <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
          ) : (
              'Post'
          )}</button>
          {emoji && <div onClick={() => { setEmoji(false) }} className="fixed md:hidden block top-0 left-0 w-full h-full bg-transparent " >
              <div className="absolute bottom-25 left-5 z-150">
                  <EmojiPicker onEmojiClick={(emojiObject) => { console.log(emojiObject); setComment(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
              </div>
          </div>}
      </div>
  )
}

export default CommentInput
