export class API {
  private static API_TOKEN = 'Bearer Far4n-ZDIKz2XADoC6-Drzp3qAm_3dgl_EedzGI4';

  public static async uploadImage(file: File): Promise<string> {
    try {
      const uploadURLResponse = await fetch('/api/images', { method: 'POST' });

      if (!uploadURLResponse.ok) {
        throw new Error('Failed to retrieve upload URL');
      }

      const { result } = await uploadURLResponse.json();
      const uploadURL = result.result.uploadURL;

      const headers = new Headers();
      headers.append('Authorization', API.API_TOKEN);

      const formData = new FormData();
      formData.append('file', file, file.name);

      const uploadResponse = await fetch(uploadURL, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      return uploadResult.result.variants[0];
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  }
}

export default API;
