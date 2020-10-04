import cloudinary from 'cloudinary';
import uploadFile from '../../helpers/uploadFile';

cloudinary.config({ 
  cloud_name: 'dbs4kwiwc', 
  api_key: '734763216148649', 
  api_secret: 'I1ZId6ALcTnXVfjK-Mb68Hu2RJo' 
});

describe('Tests for uploadFile helper', () => {
  test('Should load a file and return a URL', async (done) => {
    const resp = await fetch('https://concepto.de/wp-content/uploads/2018/09/google-e1537467715310.jpg');
    const blob = await resp.blob();
    const file = new File([blob], 'photo.jpg');
    const url = uploadFile(file);
    expect(typeof url).toBe('string');
    // Delete Cloudinary resource
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test('Should return null', async () => {
    const file = new File([], 'photo.jpg');
    const url = uploadFile(file);
    expect(url).toBe(null);
  });
});
