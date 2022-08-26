import { useRouter } from 'next/router';

import { getCategories, getCategoryPosts } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPosts = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts;

export const getStaticProps = async ({ params }) => {
  const posts = await getCategoryPosts(params.slug);

  return {
    props: {
      posts,
    },
  };
};

export const getStaticPaths = async () => {
  const categories = await getCategories();

  const paths = categories.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: true,
  };
};
