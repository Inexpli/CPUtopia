<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use LogicException;

class ApiExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::EXCEPTION => 'onKernelException'];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $e = $event->getThrowable();

        if ($e instanceof LogicException) {
            $response = new JsonResponse(
                ['error' => $e->getMessage()],
                Response::HTTP_BAD_REQUEST
            );
            $event->setResponse($response);
        }
    }

    // public function onKernelException(ExceptionEvent $event): void
    // {
    //     $e = $event->getThrowable();

    //     $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;
    //     $message = 'Something went wrong.';
    
    //     if ($e instanceof LogicException) {
    //         $statusCode = Response::HTTP_BAD_REQUEST;
    //         $message = $e->getMessage();
    //     } elseif ($e instanceof NotFoundHttpException) {
    //         $statusCode = Response::HTTP_NOT_FOUND;
    //         $message = $e->getMessage();
    //     } elseif ($e instanceof AccessDeniedHttpException) {
    //         $statusCode = Response::HTTP_FORBIDDEN;
    //         $message = 'Access denied.';
    //     }

    //     $response = new JsonResponse(
    //         ['error' => $message],
    //         $statusCode
    //     );

    //     $event->setResponse($response);
    // }
}
