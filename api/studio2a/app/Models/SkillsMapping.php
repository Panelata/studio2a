<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillsMapping extends Model
{
    protected $table = 'skills_mapping';
    protected $primaryKey = 'mappingID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'projectID', 'skills'
    ];

    protected $hidden = [
        
    ];
}
