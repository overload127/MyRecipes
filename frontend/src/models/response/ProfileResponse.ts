export interface IProfileResponse {
  id: string;
  avatar: string | null;
  birthday: string | null;
  gender: number;
  phone: string | null;
  created_at: string;
  updated_at: string;
  user: IDjangoUserResponse;
  social_other_url: string;
  social_facebook_url: string;
  social_youtube_url: string;
  social_instagram_url: string;
  social_tiktok_url: string;
  social_twitter_url: string;
  social_twitch_url: string;
  social_reddit_url: string;
  social_pinterest_url: string;
  social_vk_url: string;
  social_telegram_url: string;
  social_whatsapp_url: string;
}

interface IDjangoUserResponse {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
