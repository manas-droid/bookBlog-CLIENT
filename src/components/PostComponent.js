
import moment from 'moment';
import SummaryAndTitle from './summaryAndTitle.js';
import BookmarkAndFullPost from './bookmarkAndFullPost.js';


function PostComponent({_id , image ,bookname,summary ,createdAt , username , history , home , bookmarks}){
  return (
<div className="flex">
    <div className="time">
      <span>
        posted {moment(createdAt).fromNow(true)} ago
      </span>
    </div>
    <SummaryAndTitle bookname = {bookname} summary = {summary} image = {image}  />

    < BookmarkAndFullPost _id = {_id}  username= {username}  bookmarks = {bookmarks} history = {history} />
</div>
 );
}

export default PostComponent;
