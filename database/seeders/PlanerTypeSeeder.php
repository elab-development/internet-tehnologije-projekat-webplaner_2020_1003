<?php

namespace Database\Seeders;

use App\Models\PlanerType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanerTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planerTypes = [
            "Bullet planer",
            "Journal",
            "Sketchbook",
            "Notes",
            "Studentski planer",
        ];

        foreach ($planerTypes as $planerType) {
            PlanerType::create(['name' => $planerType]);
        }

        PlanerType::factory(5)->create();
    }
}
