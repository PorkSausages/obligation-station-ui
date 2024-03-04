import { useState } from "react"
import { updateUserProfilePicture } from "../apiCalls";
import { USER_KEY } from "../constants";
import { useNavigate } from "react-router-dom";

export default function UploadPicture() {
    const [imageFile, setImageFile] = useState();
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const userName = JSON.parse(localStorage.getItem(USER_KEY)).userName;

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    }

    const uploadImage = async () => {
        setSaving(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                const cropSize = Math.min(img.width, img.height);
                const startX = (img.width - cropSize) / 2;
                const startY = (img.height - cropSize) / 2;

                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, startX, startY, cropSize, cropSize, 0, 0, 300, 300);

                const quality = 0.5;
                const encoded = canvas.toDataURL('image/jpeg', quality);
                await updateUserProfilePicture(userName, encoded);
                navigate('/dashboard');
            };
        };
        reader.readAsDataURL(imageFile);
    };

    return (
        <div className="container text-center mt-3">
            <h1>Upload Profile Picture</h1>
            <input type="file"
                className="form-control"
                accept="image/*"
                disabled={saving} 
                onChange={handleImageChange} />
            <button disabled={saving || !imageFile} 
                className="btn"
                onClick={uploadImage}>Upload</button>
            <button disabled={saving}
                className="btn" 
                onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>
    )
}