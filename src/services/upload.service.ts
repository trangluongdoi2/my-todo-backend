import config from '@/config';
import uploadS3 from '@/utils/uploadS3';

class UploadS3Service {
  async handle(files: File[] = []) {
    if (!files?.length) {
      return [];
    }
    try {
      return await uploadS3(files, config.aws.bucket);
    } catch (error) {
      return []
    }
  }
}

export default new UploadS3Service();