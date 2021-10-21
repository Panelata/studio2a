<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'subject';
    protected $primaryKey = 'subjectID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'subjectName'
    ];


}
