'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, BadgeCheck, Clock, Eye, PenLine } from 'lucide-react';
import type { Author } from '@/data/authors';

interface AuthorBoxProps {
  author: Author;
  reviewer?: Author;
  publishedDate?: string;
  updatedDate?: string;
  readTime?: number;
  isAiAssisted?: boolean;
}

export default function AuthorBox({
  author,
  reviewer,
  publishedDate,
  updatedDate,
  readTime = 5,
  isAiAssisted = false,
}: AuthorBoxProps) {
  const displayDate = updatedDate || publishedDate;
  const formattedDate = displayDate
    ? new Date(displayDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="border border-gray-100 rounded-2xl bg-gray-50/50 p-5 my-8 space-y-4">
      {/* AI assisted badge */}
      {isAiAssisted && (
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <span className="bg-blue-50 text-blue-500 border border-blue-100 px-2 py-0.5 rounded-full">
            🤖 AI-assisted draft · human reviewed
          </span>
        </div>
      )}

      {/* Author row */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="48px"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=0B1120&color=fff&size=128`;
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <PenLine size={13} className="text-gray-400" />
              <span className="text-xs text-gray-400 font-medium">Written by</span>
            </div>
            <a
              href={author.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-[#0054D2] transition-colors"
            >
              {author.name}
              <BadgeCheck size={14} className="text-[#0054D2]" />
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{author.role} · {author.experience}+ years</p>
        </div>
        <a
          href={author.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#0077b5] bg-[#0077b5]/5 hover:bg-[#0077b5]/10 border border-[#0077b5]/20 px-3 py-1.5 rounded-full transition-all"
        >
          <Linkedin size={12} />
          LinkedIn
        </a>
      </div>

      {/* Reviewer row */}
      {reviewer && (
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0 ml-2">
            <Image
              src={reviewer.avatar}
              alt={reviewer.name}
              fill
              className="object-cover"
              sizes="32px"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewer.name)}&background=0B1120&color=fff&size=64`;
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <Eye size={12} className="text-gray-400" />
              <span className="text-xs text-gray-400">Reviewed by</span>
              <a
                href={reviewer.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-semibold text-gray-700 hover:text-[#0054D2] transition-colors"
              >
                {reviewer.name}
              </a>
              <span className="text-xs text-gray-400">· {reviewer.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Meta row */}
      {(formattedDate || readTime) && (
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 flex-wrap">
          {formattedDate && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock size={12} />
              <span>{updatedDate ? 'Updated' : 'Published'}: {formattedDate}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}