import sharp from 'sharp';
import {createUploadthing, type FileRouter} from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({image: {maxFileSize: '4MB'}}).onUploadComplete(async ({file}) => {
    try {
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetadata = await sharp(buffer).metadata();
      const {width, height} = imgMetadata;

      return {imageUrl: `${file.url}?height=${height || 500}&width=${width || 500}`};
    } catch (error) {
      console.error('Error in onUploadComplete:', error);
      throw new Error('Failed to process the uploaded file.');
    }
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
