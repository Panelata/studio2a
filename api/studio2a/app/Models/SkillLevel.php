<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillLevel extends Model
{
    protected $table = 'skill_level';
    protected $primaryKey = 'skillLevelID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'mappingID',
        'userID',
        'score'
    ];


}
