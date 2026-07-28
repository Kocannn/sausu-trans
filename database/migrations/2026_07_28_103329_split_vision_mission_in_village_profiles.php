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
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->text('vision')->nullable()->after('history');
            $table->text('mission')->nullable()->after('vision');
            $table->dropColumn('vision_mission');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_profiles', function (Blueprint $table) {
            $table->text('vision_mission')->nullable()->after('history');
            $table->dropColumn(['vision', 'mission']);
        });
    }
};
