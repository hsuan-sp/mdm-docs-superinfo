"use client"

import { notFound } from 'next/navigation'

/**
 * Catch-all route for /changelog/*
 * This ensures any non-existent paths under /changelog will trigger 404
 */
export default function ChangelogCatchAll() {
  notFound()
}
