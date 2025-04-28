import Image from "next/image";
import Link from "next/link";

interface IappProps {
  data: {
    id: string;
    title: string;
    content: string | null;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function BlogPostCard({ data }: IappProps) {
  return (
    <div className=" group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="relative h-100 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          ></Image>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-90 p-4">
          {data.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-1 p-4">
          {data.content}
        </p>
        <div className="flex items-center justify-between ml-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-8 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover "
              />
            </div>
            <p className="text-sm font-medium text-gray-700 lowercase first-letter:uppercase">
              {data.authorName}
            </p>
          </div>
          <time className="text-xs text-gray-500 pr-4">
            {new Intl.DateTimeFormat("en-Us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(data.createdAt)}
          </time>
        </div>
      </Link>
    </div>
  );
}



// const data: {
//   id: string;
//   title: string;
//   content: string | null;
//   imageUrl: string;
//   authorId: string;
//   authorName: string;
//   authorImage: string;
//   createdAt: Date;
//   updatedAt: Date;
// } | null;