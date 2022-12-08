export async function uploadImage(file: any) {
    const data = new FormData()
    data.append('file', file)
    data.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_REACT_APP_CLOUDINARY_PRESET as string
    )
    return fetch(process.env.NEXT_PUBLIC_REACT_APP_CLOUDINARY_URL as string, {
        method: 'POST',
        body: data,
    })
        .then((res) => res.json())
        .then((data) => data.url)
}
