<?php

namespace App\Http\Traits;

use App\Models\Room;
use App\Models\Beacon;
use App\Models\Presence;
use App\Models\PresencesDetail;
use App\Models\Subject;
use App\Models\SubjectsSchedule;
use App\Models\User;
use Illuminate\Http\Request;

trait PresenceTrait
{
    public function validateRoom($beacon_data)
    {
        $beacon = new Beacon();
        $room = new Room();

        $beacon_id = $beacon
            ::where('proximity_uuid', $beacon_data->proximity_uuid)
            ->where('major', $beacon_data->major)
            ->where('minor', $beacon_data->minor)
            ->first('beacon_id');

        if (!is_null($beacon_id)) {
            $room_detail = $room
                ::where('beacon_id', $beacon_id->beacon_id)
                ->first();
            if (!is_null($room_detail)) {
                return response()->json($room_detail, 200);
            } else {
                return response()->json(
                    [
                        'message' => 'Ruangan tidak ditemukan!',
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'message' => 'Proximity UUID tidak terdaftar!',
                ],
                200
            );
        }

        // $room_detail = Room::where([
        //     ['beacon.proximity_uuid', $beacon_data->proximity_uuid],
        //     ['beacon.major', $beacon_data->major],
        //     ['beacon.minor', $beacon_data->minor],
        // ])->first();

        // if (!$room_detail) {
        //     return response()->json(
        //         [
        //             'message' => 'Proximity UUID tidak terdaftar!',
        //         ],
        //         200
        //     );
        // } else {
        //     return response()->json($room_detail, 200);
        // }
    }

    public function validateSchedule(Request $request)
    {
        $room_detail = $this->validateRoom($request);
        $subjects_schedule = new SubjectsSchedule();
        $subject = new Subject();
        $user = new User();

        if (!is_null($room_detail)) {
            $subject_schedule_detail = $subjects_schedule
                ::where('room_id', $room_detail->original['room_id'])
                ->first();
            if (!is_null($subject_schedule_detail)) {
                $subject_detail = $subject
                    ::where('subject_id', $subject_schedule_detail->subject_id)
                    ->first();
                if (!is_null($subject_detail)) {
                    $user_detail = $user
                        ::where('user_id', $subject_schedule_detail->user_id)
                        ->first();
                    if (!is_null($user_detail)) {
                        return response()->json(
                            [
                                "subject_schedule" => $subject_schedule_detail,
                                "subject" => $subject_detail,
                                "lecturer" => $user_detail,
                                "room" => $room_detail->original,
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'message' => 'Data dosen tidak ditemukan!',
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'message' => 'Matkul tidak ditemukan!',
                        ],
                        200
                    );
                }
            } else {
                return response()->json(
                    [
                        'message' => 'Jadwal tidak ditemukan!',
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'message' => 'Ruangan tidak ditemukan!',
                ],
                200
            );
        }
    }

    public function validatePresence(Request $request)
    {
        $room_detail = $this->validateRoom($request);
        $subjects_schedule = new SubjectsSchedule();
        $presence = new Presence();
        $user = new User();
        $subject = new Subject();
        $user_detail = $user::where('user_id', $request->user_id)->first();

        if (!is_null($room_detail)) {
            $subject_schedule_detail = $subjects_schedule
                ::where('room_id', $room_detail->original['room_id'])
                ->where('study_group_id', $user_detail->study_group_id)
                ->first();
            if (!is_null($subject_schedule_detail)) {
                $subject_detail = $subject
                    ::where('subject_id', $subject_schedule_detail->subject_id)
                    ->first();
                $lecturer_detail = $user
                    ::where('user_id', $subject_schedule_detail->user_id)
                    ->first();
                $presence_detail = $presence
                    ::latest('presence_id')
                    ->where(
                        'subject_schedule_id',
                        $subject_schedule_detail->subject_schedule_id
                    )
                    ->where('is_open', true)
                    ->first();
                if (!is_null($presence_detail)) {
                    if (!is_null($user_detail)) {
                        return response()->json(
                            // [
                            //     "subject_schedule" => $subject_schedule_detail,
                            //     "subject" => $subject_detail,
                            //     "student" => $user_detail,
                            //     "room" => $room_detail->original,
                            //     "presence_detail" => $presence_detail,
                            // ],
                            [
                                "subject_schedule" => $subject_schedule_detail,
                                "subject" => $subject_detail,
                                "student" => $user_detail,
                                "lecturer" => $lecturer_detail,
                                "room" => $room_detail->original,
                                "presence_detail" => $presence_detail,
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'message' => 'Data dosen tidak ditemukan!',
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'message' => 'Kelas tidak ditemukan!',
                        ],
                        200
                    );
                }
            } else {
                return response()->json(
                    [
                        'message' => 'Jadwal tidak ditemukan!',
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'message' => 'Ruangan tidak ditemukan!',
                ],
                200
            );
        }
    }

    public function activeClass($userId)
    {
        $presence = new Presence();
        $presence_detail = new PresencesDetail();
        $user = new User();
        $user_detail = $user::where('user_id', $userId)->first('role_id');
        if ($user_detail->role_id == 1) {
            // if student
            $presence_id = $presence_detail
                ::latest('presence_id')
                ->where('user_id', $userId)
                ->where('is_inclass', true)
                ->first('presence_id');
            if ($presence_id != null) {
                $latestPresence = $presence
                    ->where('presence_id', $presence_id->presence_id)
                    ->where('is_open', true)
                    ->where('close_time', null)
                    ->with(['room', 'subject_schedule'])
                    ->first();
            } else {
                return response()->json(
                    ['message' => 'Belum ada kelas yang aktif'],
                    404
                );
            }
        } else {
            // if lecturer
            $latestPresence = $presence
                ::latest('presence_id')
                ->where('user_id', $userId)
                ->where('is_open', true)
                ->where('close_time', null)
                ->with(['room', 'subject_schedule'])
                ->first();
        }

        if ($latestPresence != null) {
            return response()->json($latestPresence, 200);
        } else {
            return response()->json(
                ['message' => 'Belum ada kelas yang aktif'],
                404
            );
        }
    }
}
