// Search books by name or author
exports.searchBooks = async (req, res) => {
    const { search } = req.query;

    try {
        const books = await Book.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ]
        });

        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
