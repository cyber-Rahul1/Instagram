import EmojiPicker from "emoji-picker-react";
import { useContext } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md"
import { ThemeContext } from "../context/ContextProvider";

const CommentInput = ({ reply, comment, setComment, handleAddReply, handleAddComment, 
    loading, setEmoji, emoji, theme, postId, posts, indexval, page, post }) => {

    const { hideCommenting, inputRef } = useContext(ThemeContext)


    
   

  return (
      <div className={` ${(page === 'main' && post?.hideComments) || hideCommenting[postId] || (posts && posts[indexval]?.hideComments) ? 'hidden' : ''} w-full h-fit flex z-50 items-center justify-center p-3 gap-3`}>
          <MdOutlineEmojiEmotions size={27} className={`${theme === 'dark' ? 'text-white hover:text-[#ffffff81]' : (theme === 'light') ? 'text-black hover:text-[#00000081] ' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81] text-black dark:text-white'}    cursor-pointer  transition-all duration-200 ease-in-out `} onClick={() => { setEmoji(!emoji) }} />
          <input ref={inputRef} type="text" value={comment} onChange={(e) => { setComment(e.target.value) }}  placeholder="Add a comment..." className={`w-full h-10 outline-none bg-transparent ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
          <button onClick={reply ? handleAddReply : handleAddComment} disabled={comment === ''} className={` ${theme === 'dark' ? 'text-white hover:text-[#ffffff81]' : (theme === 'light') ? 'text-black hover:text-[#00000081]' : ' text-black hover:text-[#ffffff81] dark:hover:text-[#ffffff81] dark:text-white'} transition-all duration-200 ease-in-out ${comment === '' ? 'opacity-50' : 'active:scale-95  cursor-pointer '}`}>{loading ? (
              <div className={`w-4 h-4 border-t-1 border-b-1 ${theme === 'dark' ? 'border-[#ffffff]' : (theme === 'light') ? 'border-[#000000]' : ' border-[#000000] dark:border-[#ffffff]'} rounded-full animate-spin`}></div>
          ) : (
              'Post'
          )}</button>
          {emoji && <div onClick={() => { setEmoji(false) }} className=" fixed block md:hidden top-0 left-0 w-full h-full" >
              <div className={`absolute z-200  ${page === 'reels' ? 'md:bottom-80 md:right-50 hidden md:flex' : 'bottom-25 left-5 md:hidden'}`}>
                  <EmojiPicker onEmojiClick={(emojiObject) => { console.log(emojiObject); setComment(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
              </div>
              {page === 'reels' && <div className={`absolute z-200 ${page === 'reels' ? 'bottom-25 left-5 md:hidden' : ''}`}>
                  <EmojiPicker onEmojiClick={(emojiObject) => { console.log(emojiObject); setComment(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
              </div>}
          </div>}
      </div>
  )
}

export default CommentInput
