<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsCategoryController extends Controller
{
    public function index()
    {
        $categories = NewsCategory::latest()->get();

        return Inertia::render('admin/news-categories/index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/news-categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:news_categories,name',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $category = NewsCategory::create($validated);

        if ($request->wantsJson()) {
            return response()->json(['category' => $category, 'message' => 'Kategori berhasil ditambahkan.']);
        }

        return redirect()->route('admin.news-categories.index')->with('success', 'Kategori berita berhasil ditambahkan.');
    }

    public function edit(NewsCategory $news_category)
    {
        return Inertia::render('admin/news-categories/edit', [
            'category' => $news_category,
        ]);
    }

    public function update(Request $request, NewsCategory $news_category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:news_categories,name,'.$news_category->id,
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $news_category->update($validated);

        return redirect()->route('admin.news-categories.index')->with('success', 'Kategori berita berhasil diperbarui.');
    }

    public function destroy(NewsCategory $news_category)
    {
        $news_category->delete();

        return redirect()->route('admin.news-categories.index')->with('success', 'Kategori berita berhasil dihapus.');
    }
}
