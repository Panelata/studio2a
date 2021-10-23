<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentGroupEnrollment extends Model
{
    protected $table = 'groups';
    protected $primaryKey = 'studentGroupEnrollmentID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'groupID', 'userID'
    ];
}
