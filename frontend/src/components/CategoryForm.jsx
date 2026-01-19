
function CategoryForm({ value, setValue, handleSubmit, buttonText = "submit", handleDelete }) {
    return (
        <div className='p-3 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex gap-3'>
                <input
                    type='text'
                    className="py-3 px-4 border rounded-lg w-full"
                    placeholder="Write category name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {/* <div className="div"> */}
                    <button className="bg-pink-500 rounded-lg 
            text-white py-2 px-4 hover:bg-pink-600 
            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 font-medium">
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button
                            onClick={handleDelete}
                            className="ml-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
                        >
                            Delete
                        </button>
                    )}
                {/* </div> */}
            </form>
        </div>
    )
}

export default CategoryForm