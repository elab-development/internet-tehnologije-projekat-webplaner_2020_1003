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
        Schema::table('planers', function (Blueprint $table) {
            $table->bigInteger('planer_type_id')->unsigned();
            $table->foreign('planer_type_id')->references('id')->on('planer_types');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planers', function (Blueprint $table) {
            $table->dropForeign(['planer_type_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn('planer_type_id');
            $table->dropColumn('user_id');
        });
    }
};
