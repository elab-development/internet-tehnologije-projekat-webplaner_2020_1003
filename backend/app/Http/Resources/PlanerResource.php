<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'planerType' => new PlanerTypeResource($this->planerType),
            'user' => new UserResource($this->whenLoaded('user')),
            'createdAt' => $this->created_at->format('d.m.Y.'),
            'updatedAt' => $this->updated_at->format('d.m.Y.'),
        ];
    }
}
