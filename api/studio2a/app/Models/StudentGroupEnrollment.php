<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentGroupEnrollment extends Model
{
    protected $table = 'student_group_enrollment';
    protected $primaryKey = 'studentGroupEnrollmentID';
    protected $connection = 'studio2a';
    public $timestamps = false;

    protected $filalble = [
        'groupID', 'userID'
    ];
}
