using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services
{
    public class ImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService(IConfiguration config)
        {
            var account = new Account(
                config["Cloudinary:CloudName"],
                config["Cloudinary:ApiKey"],
                config["Cloudinary:ApiSecret"]
            );

            _cloudinary = new(account);
        }

        public async Task<ImageUploadResult> AddImageAsync(IFormFile file, string? folder = null,
            ImageTransform? transform = null)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();

                if (!string.IsNullOrEmpty(folder))
                {
                    _cloudinary.CreateFolder(folder);
                }

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = $"{folder}",
                    Format = "webp",
                    Transformation = transform != null
                        ? new Transformation()
                            .Height(transform.Height)
                            .Width(transform.Width)
                            .Gravity(transform.Gravity)
                            .Crop(transform.Crop.ToString())
                            .FetchFormat("webp")
                        : null
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteParams);

            return result;
        }
    }

    public class ImageTransform
    {
        public int Height { get; set; } = 800;
        public int Width { get; set; } = 600;
        public CropMode Crop { get; set; } = CropMode.fit;
        public string Gravity { get; set; } = "auto";

        public ImageTransform()
        {
        }

        public ImageTransform(int height, int width, CropMode crop)
        {
            Height = height;
            Width = width;
            Crop = crop;
        }
    }

    public enum CropMode
    {
        fill,
        fit,
        lfill,
        fill_pad,
        crop,
        thumb
    }
}