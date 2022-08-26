import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const RelatedPost = ({ post }) => {
  return (
    <div className='flex items-center w-full mb-4'>
      <div className='w-16 flex-none'>
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          height='60px'
          width='60px'
          className='align-middle rounded-full'
          unoptimized
        />
      </div>
      <div className='flex-grow ml-4'>
        <p className='text-gray-500 font-xs'>
          {moment(post.createdAt).format('MMM DD, YYYY')}
        </p>
        <Link href={`/post/${post.slug}`} className='text-md'>
          {post.title}
        </Link>
      </div>
    </div>
  );
};

export default RelatedPost;
