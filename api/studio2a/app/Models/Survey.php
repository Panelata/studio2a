<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $table = 'survey';
    protected $primaryKey = 'projectID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'projectName', 'size', 'subjectID'
    ];

    protected $hidden = [
        
    ];
}
