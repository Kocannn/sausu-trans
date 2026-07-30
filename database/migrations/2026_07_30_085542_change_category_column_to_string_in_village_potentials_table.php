<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('village_potentials', function (Blueprint $table) {
            $table->string('category')->default('produk')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_potentials', function (Blueprint $table) {
            // Can't reliably reverse to enum easily in some databases without raw queries
            // but we can leave it as string for rollback or change it back to enum
            $table->enum('category', ['wisata', 'produk', 'lainnya'])->default('produk')->change();
        });
    }
};
