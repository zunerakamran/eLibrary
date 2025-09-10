'use client'
import { useEffect, useRef, useState } from "react"
import notFound from "@/app/error";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { LoadingFullScreen } from "@/app/components/LoadingFullScreen";
interface Book {
    id: number;
    title: string;
    image: string;
    author: string;
    narrator: string;
    publisher: string;
    category: string;
    publishedAt: Date;
    details: string;
    isVerified: boolean;
    userId: number
}


export default function UpdateBook() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const route = useRouter()
    const [isUpdateModalOpen, setUpdateModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null);
    const params = useParams<{ id: string }>();
    const id = params.id;
    const bookid = Number(id)
    const router = useRouter();
    const [loading, setLoader] = useState(true)
    const [user, setUser] = useState<{ id: number; username: string } | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [isVisible, setisVisible] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`${baseUrl}/api/cookies`, { cache: "no-store" })
            if (!res.ok) {
                router.push('/');
                return;
            }
            else{
                const data= await res.json()
                return notFound(data)
            }
            const data = await res.json()
            setUser(data)
        }
        fetchUser();
    }, [router])
    useEffect(() => {
        async function fetchBook() {
            if (!user) return
            const res = await fetch(`/api/books/${bookid}`)
            if(!res.ok){
                const data= await res.json()
                return notFound(data.error)
            }
            const { book }: { book: Book } = await res.json();
            if (user && Number(user.id) !== Number(book.userId)) {
                router.push('/');
                return
            }
            setBook(book)
            setLoader(false)
        }
        fetchBook();
    }, [bookid, user, router])

    const [formData, setFormData] = useState({
        image: null as File | null,
        title: "",
        category: "",
        author: "",
        narrator: "",
        publisher: "",
        publishedAt: "",
        details: "",
    })
    useEffect(() => {
        if (book) {
            setFormData({
                image: book.image as unknown as File | null,
                title: book.title,
                category: book.category,
                author: book.author || "",
                narrator: book.narrator || "",
                publisher: book.publisher || "",
                publishedAt: book.publishedAt ? new Date(book.publishedAt).toISOString().split('T')[0] : "",
                details: book.details || "",
            });
        }
    }, [book])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement
        if (name === "image" && files) {
            setFormData({ ...formData, image: files[0] })
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        const form = new FormData();
        form.append("image", formData.image as File);
        form.append("title", formData.title);
        form.append("author", formData.author);
        form.append("narrator", formData.narrator);
        form.append("publisher", formData.publisher);
        form.append("publishedAt", formData.publishedAt);
        form.append("details", formData.details)
        form.append("category", formData.category)
        setUpdateModal(false)
        const res = await fetch(`/api/books/${bookid}`, {
            method: 'PATCH',
            body: form
        })
        if(!res.ok){
           const data = await res.json();
           return notFound(data.error)
        }
        route.push("/my-books")
    }
    if (loading) return <LoadingFullScreen />; // or LoadingInline / SkeletonGrid

    return (
        <>
            <div className="container mx-auto mb-12">
                <div className="flex flex-wrap -mx-2 add-book-container mt-5">

                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 add-book-sub-container">
                        <form ref={formRef} onSubmit={(e) => e.preventDefault()} id="addBook">
                            <button type="button" className="library-button mb-5" onClick={() => setisVisible(!isVisible)}>Update Book Image</button>
                            <div className="flex flex-wrap justify-center">
                                <div className={isVisible ? "block w-full" : "hidden"}>
                                    <label className="input-label">
                                        Choose Your Book Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="custom-file-input"
                                        name="image"
                                        onChange={handleChange} />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        name="title"
                                        className="library-input"
                                        pattern="^[A-Za-z0-9\s\-:,.!?()]{2,100}$"
                                        title="Title should be 2-100 characters and contain only letters, numbers, spaces, and common punctuation."
                                        value={formData.title}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Select Book Category
                                    </label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="library-input" required>
                                        <option value="" disabled selected>Select</option>
                                        <option value="fiction">Fiction</option>
                                        <option value="children">Children</option>
                                        <option value="history">History</option>
                                        <option value="biography">Biography</option>
                                        <option value="arts">Arts</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Author
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Author"
                                        name="author"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Author name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.author}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Narrator
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Narrator"
                                        name="narrator"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Narrator name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.narrator}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Publisher
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Publisher"
                                        name="publisher"
                                        className="library-input"
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Publisher name should be 2–50 characters and contain only letters, spaces, and common name punctuation (like . or -)."
                                        value={formData.publisher}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Published Date
                                    </label>
                                    <input
                                        type="date"
                                        name="publishedAt"
                                        className="library-input"
                                        value={formData.publishedAt}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="w-full">
                                    <label className="input-label">
                                        Enter Your Book Details
                                    </label>
                                    <input
                                        placeholder="Details"
                                        name="details"
                                        className="library-textarea"
                                        required
                                        value={formData.details}
                                        onChange={handleChange}
                                        pattern="^[A-Za-z\s.'-]{2,50}$"
                                        title="Details must be 20-1000 characters and can include letters, numbers, and punctuation." />
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                                <button className="btn library-button" onClick={() => {
                                    if (formRef.current?.checkValidity()) {
                                        // ✅ open modal only if form is valid
                                        setUpdateModal(true);
                                    } else {
                                        // ❌ show browser validation if not valid
                                        formRef.current?.reportValidity();
                                    }
                                }}
                                >UPDATE</button>

                                {isUpdateModalOpen && (
                                    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                Confirm Action
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Are you sure you want to update this item?
                                            </p>
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                                                    onClick={() => setUpdateModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit"
                                                    className="px-4 py-2 rounded-lg bg-green-600 text-white transition cursor-pointer"
                                                    onClick={handleSubmit}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2">
                        <Image
                            src="/images/update.jpg"
                            alt="Update Book"
                            width={500}
                            height={300}
                            className="add-book-image"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}