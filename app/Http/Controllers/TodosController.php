<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyTodosRequest;
use App\Http\Requests\StoreTodosRequest;
use App\Http\Requests\UpdateTodosRequest;
use App\Models\Todos;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;

class TodosController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('tasks');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodosRequest $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'task' => ['required', 'string', 'min:5', 'max:255'],
            'priority' => ['required', 'numeric', 'min:1', 'max:3']
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error.',
                'fields' => $errors[0]
            ]);
        }

        try {
            $todo = Todos::create([
                'task' => $request->task,
                'priority' => $request->priority,
                'created_by' => Auth::id()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Task created successfully.',
                'test' => Auth::guest()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function fetch(Todos $todos): JsonResponse
    {
        try {
            $tasks = Todos::all()->where('created_by', Auth::id());

            return response()->json([
                'status' => 'success',
                'data' => $tasks
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodosRequest $request): JsonResponse
    {
        try {
            $task = Todos::where('created_by', Auth::id())
                ->where('id', $request->id)
                ->first();

            if ($task) {
                $task->is_completed = $request->is_completed;
                $task->save();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Task successfully updated.'
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found.'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyTodosRequest $request)
    {
        try {
            $task = Todos::where('created_by', Auth::id())
                ->where('id', $request->id)
                ->first();

            if ($task) {
                $task->delete();

                return response()->json([
                    'status' => 'success',
                    'message' => 'Task successfully deleted.'
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found.'
                ]);
            }


        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
